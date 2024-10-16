import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

Deno.serve(async (req) => {

  let supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  // Get the session or user object
  const authHeader = req.headers.get('Authorization')!
  const token = authHeader.replace('Bearer ', '')
  const { data } = await supabaseClient.auth.getUser(token)
  const user = data.user!!

  console.log(`Welcome, ${user.id} ${user.email}`)

  // Reassign the user role.
  supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''}` } } }
  )

  const response = await supabaseClient.schema("auth")
      .from("users")
      .update({role: "service_consumer"}) // todo
      .eq('id', user.id)

  return new Response(
      JSON.stringify(response),
      { headers: { "Content-Type": "application/json" } },
  )
})