import {expect, test} from '@jest/globals';
import {createClient} from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_TEST_USER = process.env.SUPABASE_TEST_USER;
const SUPABASE_TEST_PASSWORD = process.env.SUPABASE_TEST_PASSWORD;

test("Receive 'pong' from 'ping' edge function", async () => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const loginResult = await supabase.auth.signInWithPassword({
        email: SUPABASE_TEST_USER,
        password: SUPABASE_TEST_PASSWORD,
    });

    // Assert successful login.
    expect(loginResult).toHaveProperty("error", null)
    expect(loginResult).toHaveProperty("data.user.email", SUPABASE_TEST_USER)

    // Ping.
    const pingResponse = await supabase.functions.invoke('ping', {})
    expect(pingResponse).toHaveProperty("error", null)
    expect(pingResponse).toHaveProperty("data.pong", true)
})
