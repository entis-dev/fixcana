declare namespace NodeJS {
    export interface ProcessEnv {
        SUPABASE_URL: string;
        SUPABASE_ANON_KEY: string;
        SUPABASE_TEST_USER: string;
        SUPABASE_TEST_PASSWORD: string;
    }
}