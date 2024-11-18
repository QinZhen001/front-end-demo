import React, { Suspense } from "react"
import { fetchProfileData } from "./api"

const resource = fetchProfileData()

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read()
  return <h1>{user.name}</h1>
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts: any[] = resource.posts.read()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  )
}

export const TestSuspense = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading profile...</h1>}>
        <ProfileDetails />
        <Suspense fallback={<h1>Loading posts...</h1>}>
          <ProfileTimeline />
        </Suspense>
      </Suspense>
    </>
  )
}

export default TestSuspense
