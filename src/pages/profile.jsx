import { useSession } from "@/web/components/SessionContext"
import { useQuery } from "@tanstack/react-query"
import apiClient from "@/web/services/apiClient"
import Title from "@/web/components/Title"
import Loader from "@/web/components/Loader"
import ErrorMessage from "@/web/components/AlertMessages/ErrorMessage"

const Profile = () => {
  const { session } = useSession()
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        if (!session || !session.id) {
          throw new Error("User information not available.")
        }

        const userData = await apiClient.get(`/users/${session.userId}`)

        return userData.result
      } catch (error) {
        throw new Error("User information not available.")
      }
    },
    enabled: Boolean(session),
  })

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <Title titleLabel="Profile" />
      {isError ? (
        <ErrorMessage error="User information not available." />
      ) : (
        <>
          {user ? (
            <>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>E-mail: {user.email}</p>
              <p>Account Type: {user.userType}</p>
            </>
          ) : (
            <ErrorMessage error="User information not available." />
          )}
        </>
      )}
    </div>
  )
}

export default Profile
