import ApiService from '@/services/api/config/ApiService';

export default class EducationApiService extends ApiService {
    constructor() {
        super('api/v1/file');
    }
}