export const getUserByEmail = "SELECT * FROM TBL_USERS WHERE EMAIL = ?";
export const createUserByEmail =
  "INSERT INTO TBL_USERS (PASSWORD, EMAIL, CREATED_BY) VALUES (?,?,?)";
export const createAd =
  "INSERT INTO TBL_ADVERTISEMENT ( AD_ID, USER_ID ) VALUES (?,?) ";

export const queries = {
  // getUserByEmail: getUserByEmail,
  // createUserByEmail: createUserByEmail,
  // createAd: createAd,
  selectExistingUser: "SELECT * FROM TBL_ADMIN_USERS WHERE EMAIL = ?",
  // updateAccessToken: "UPDATE TBL_ADMIN_USERS SET ACCESS_TOKEN = ? WHERE ID = ?",
  // getAdminPermissions:
  //   "SELECT tau.ID, tau.USERNAME, CONCAT('[', GROUP_CONCAT(tarp.permission_id), ']') AS permissions FROM TBL_ADMIN_USERS tau INNER JOIN TBL_ADMIN_USER_ROLE taur ON taur.user_id = tau.ID INNER JOIN TBL_ADMIN_ROLE_PERMISSION tarp ON tarp.role_id = taur.role_id WHERE tau.ID = ?",
  users: {
    selectExistingUser: "SELECT * FROM TBL_USERS WHERE EMAIL = ?",
    selectExistingUserByEmailandUserId:
      "SELECT * FROM TBL_USERS WHERE EMAIL = ? AND ID = ?",
    updateAccessToken: "UPDATE TBL_USERS SET ACCESS_TOKEN = ? WHERE ID = ?",
    insertOnBoarding:
      "INSERT INTO TBL_USERS_ONBOARDING (USER_ID, STEPS) VALUES (?, ?)",
  },
  onBoarding: {
    selectOnBoarding:
      "SELECT STEPS AS 'steps' FROM TBL_USERS_ONBOARDING WHERE USER_ID = ?",
    updateOnBoarding:
      "UPDATE TBL_USERS_ONBOARDING SET STEPS = ? WHERE USER_ID = ?",
    selectPersonal:
      "SELECT BIRTH AS 'birthDate', CIVIL_STATUS AS 'civilStatus', ETHNICITY AS 'ethnicity', FIRST_NAME AS 'firstName', GENDER AS 'gender', HEIGHT AS 'height', ID as 'id', LAST_NAME AS 'lastName', MIDDLE_NAME AS 'middleName', RELIGION AS 'religion', user_id AS 'userId' FROM TBL_USERS_PERSONAL WHERE USER_ID = ?",
    insertPersonal:
      "INSERT INTO TBL_USERS_PERSONAL (USER_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, BIRTH, RELIGION, GENDER, ETHNICITY, CIVIL_STATUS, HEIGHT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    updatePersonal:
      "UPDATE TBL_USERS_PERSONAL SET FIRST_NAME = ?, MIDDLE_NAME = ?, LAST_NAME = ?, BIRTH = ?, RELIGION = ?, GENDER = ?, ETHNICITY = ?, CIVIL_STATUS = ?, HEIGHT = ? WHERE USER_ID = ? AND ID = ?",
  },
};
