import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    auth,
    async ({
      res,
      models: { UserModel },
      session: { id },
    }) => {
      const user = await UserModel.query().findById(id).throwIfNotFound()

      res.send({
        result: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
        },
      })
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        userId: idValidator,
      },
    }),
    async ({
      models: { UserModel },
      input: {
        query: { userId },
      },
      res,
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      await user.$query().delete()

      res.send(user)
    },
  ],
})

export default handle
