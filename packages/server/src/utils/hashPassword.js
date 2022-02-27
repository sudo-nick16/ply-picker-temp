import bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
  return new Promise(async (resolve) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    resolve(hashedPassword);
  });
};
