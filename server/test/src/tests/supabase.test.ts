import {createClient} from "@supabase/supabase-js";
import {expect, test} from '@jest/globals';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_TEST_USER = process.env.SUPABASE_TEST_USER;
const SUPABASE_TEST_PASSWORD = process.env.SUPABASE_TEST_PASSWORD;

test("Login to supabase with test credentials", async () => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const loginResult = await supabase.auth.signInWithPassword({
        email: SUPABASE_TEST_USER,
        password: SUPABASE_TEST_PASSWORD,
    });
    expect(loginResult).toHaveProperty("error", null)
    expect(loginResult).toHaveProperty("data.user.email", SUPABASE_TEST_USER)
})