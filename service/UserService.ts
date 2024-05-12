import $api from "@/http";
import { User } from "@/model/User";
import { AxiosResponse } from "axios";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<User>> {
        return $api.get('/users')
    }
}