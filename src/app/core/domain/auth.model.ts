export interface LoginCredentials {
    username?: string;
    password?: string;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;

    // TODO: BMR: 04/23/2019: Need to figure out if we need username or email or both
    username?: string;
    email: string;
    companyName: string;

    organization?: string;
}

export interface ChangePasswordCredentials {
    username: string;
    oldPassword: string;
    newPassword?: string;
}

export interface Auth extends LoginCredentials {
    accessToken?: string;
    idToken?: string;
    newPasswordRequired?: boolean;
}

export interface AuthResponse {
    // Access Token
    accessToken: string;

    // ID Token
    idToken: string;

    // OPTIONAL: Only used if the login response requires a new password, which is
    // usually following a login with a temp password after a new user registration.
    newPasswordRequired?: boolean;
}

export interface RegisterResponse {
    message: string;
}
