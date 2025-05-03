import { APIRequestContext, request } from "@playwright/test";

class apiController {
    private fakerApi: APIRequestContext;

    async init() {
        this.fakerApi = await request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com/'
        });
    }

    async getUsers() {
        const response = await this.fakerApi.get('users');
        const responseBody = await response.json();
        return responseBody[0];
    }

    async createUserTodo(title: string, completed: string){
        const postResponse = await this.fakerApi.post('/users/1/todos',{
            data: {
              "title": title,
              "completed" : completed
            }
        });
        return await postResponse.json();
    }
}
export default new apiController();