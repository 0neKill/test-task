import axios, { AxiosResponse } from 'axios';

import type { Dashboard } from '__types__/dashboard';

export class UserService {
    static async getTitleDashboard(): Promise<AxiosResponse<Dashboard[]>> {
        return await axios.get<Dashboard[]>('./data.json');
    }
}