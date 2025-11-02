# TODO: Fix Build Error by Converting Homepage to Server Component

## Overview
Convert the homepage from client-side to server-side component to prevent DB calls during build time. Fetch data server-side using `getPayload` and pass as props to components.

## Steps
- [ ] Edit `src/app/(frontend)/page.tsx`: Remove 'use client', make async, fetch data for categories, pinned posts, latest posts, most viewed posts, featured posts.
- [ ] Edit `src/app/(frontend)/components/CategoryCards.tsx`: Remove client-side fetching, accept categories as props.
- [ ] Edit `src/app/(frontend)/components/PinnedPosts.tsx`: Remove client-side fetching, accept posts as props.
- [ ] Edit `src/app/(frontend)/components/LatestPosts.tsx`: Remove client-side fetching, accept posts as props.
- [ ] Edit `src/app/(frontend)/components/MostViewedPosts.tsx`: Remove client-side fetching, accept posts as props.
- [ ] Edit `src/app/(frontend)/components/FeaturedPost.tsx`: Keep client-side for navigation, but accept posts as props.
- [ ] Test build locally with `npm run build`.
- [ ] Commit changes.
- [ ] Push to repo.
- [ ] Redeploy on Vercel.
