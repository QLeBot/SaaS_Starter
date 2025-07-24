## Supabase Authentication Setup

1. Create a `.env.local` file in `apps/frontend/` with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Get these values from your [Supabase project settings](https://app.supabase.com/).

3. The login button uses GitHub as the OAuth provider. Enable GitHub login in your Supabase dashboard and configure the callback URL to match your deployment (e.g., `http://localhost:3000`). 