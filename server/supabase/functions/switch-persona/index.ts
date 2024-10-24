import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import {createClient} from 'jsr:@supabase/supabase-js@2'

import * as postgres from 'https://deno.land/x/postgres@v0.17.0/mod.ts'

enum Persona {
    SERVICE_PROVIDER = "service_provider",
    SERVICE_CONSUMER = "service_consumer",
}

Deno.serve(async (req) => {
    let requestedPersona: string = "";

    try {
        const body = await req.json();
        requestedPersona = body.requestedPersona;   ``
    } catch (e) {
        return new Response(
            JSON.stringify({
                error: `Malformed JSON in request body`,
            }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            },
        );
    }

    let requestedRole: string = "";
    switch (requestedPersona) {
        case Persona.SERVICE_PROVIDER:
            requestedRole = "service_provider";
            break;
        case Persona.SERVICE_CONSUMER:
            requestedRole = "service_consumer";
            break;
        default:
            return new Response(
                JSON.stringify({
                    error: `Unsupported persona: ${requestedPersona}`,
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                },
            );
    }

    // First of all, validate the user.
    let supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user: { role: previousRole, ...user } }, error } =
        await supabaseClient.auth.getUser(token);
    if (error || !user) {
        return new Response(JSON.stringify({ error }), {
            status: 401,
            headers: { "Content-Type": "application/json; charset=utf-8" },
        });
    }

    // If the user already has the correct role, do nothing.
    if (requestedRole == previousRole) {
        return new Response(
            JSON.stringify({
                error: `User already has the persona '${requestedPersona}'`,
            }),
            {
                status: 409,
                headers: { "Content-Type": "application/json; charset=utf-8" },
            },
        );
    }

    // Update the role in the private DB schema.
    const databaseUrl = Deno.env.get("SUPABASE_DB_URL")!;
    const pool = new postgres.Pool(databaseUrl, 3, true);
    const connection = await pool.connect();
    try {
        await connection.queryArray(
            `UPDATE auth.users SET role = '${requestedRole}' WHERE id = '${user.id}';`,
        );

        // Verify that the update was successful.
        const { data: { user: { role: updatedRole } } } = await supabaseClient
            .auth.getUser(token);

        if (updatedRole != requestedRole) {
            throw new Error(`Unexpected use role post-update: ${updatedRole}`);
        }

        console.info(
            `Updated persona of user ${user.id}: ${previousRole} => ${updatedRole}`,
        );

        // Return the response with the correct content type header
        return new Response(JSON.stringify({ role: updatedRole }), {
            status: 200,
            headers: { "Content-Type": "application/json; charset=utf-8" },
        });
    } catch (e) {
        console.error(`Error updating persona of ${user.id}`, e);
        return new Response(
            JSON.stringify({
                error: "An internal error occurred while updating the persona",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json; charset=utf-8" },
            },
        );
    } finally {
        connection.release();
    }
});
