import { Client, Account, ID } from "appwrite";
import credentials from "@/lib/credentials";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(credentials.end_point)
      .setProject(credentials.project_id);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async generate_getOTPToken(email) {
    try {
      return await this.account.createEmailToken(ID.unique(), email);
    } catch (error) {
      throw error;
    }
  }

  async loginUsingOTP({ user_id, otpToken }) {
    try {
      return await this.account.createSession(user_id, otpToken);
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("LogOut Error", error);
      throw error;
    }
  }

  async allSessions() {
    try {
      return await this.account.listSessions();
    } catch (error) {
      console.log("All Sessions Error", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;
