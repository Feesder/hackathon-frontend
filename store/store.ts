import { API_URL } from "@/http";
import { User } from "@/model/User";
import { AuthResponse } from "@/model/response/AuthResponse";
import AuthService from "@/service/AuthService";
import axios from "axios";
import { makeAutoObservable } from "mobx";

export default class Store {
    user = {} as User;
    isAuth = false;
    isLoading = false;
    isActivate = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: User) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setActive(bool: boolean) {
        this.isActivate = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.refreshToken);
            this.setAuth(true);
            this.setActive(response.data.user.isActivated);
            this.setUser(response.data.user);
            console.log(localStorage.getItem('token'))
        } catch (e) {
            console.log(e)
        }
    }

    async registration(login: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(login, email, password);
            localStorage.setItem('token', response.data.refreshToken);
            this.setAuth(true);
            this.setActive(response.data.user.isActivated);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(true);
            this.setUser({} as User);
        } catch (e) {
            console.log(e)
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.refreshToken);
            this.setAuth(true);
            this.setActive(response.data.user.isActivated);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
}