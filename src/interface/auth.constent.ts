export const USER_ROLE = {
  ADMIN: "admin",
  SUPER_ADMIN: "super-admin",
  USER: "user",
  MENAGER: "menager",
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
