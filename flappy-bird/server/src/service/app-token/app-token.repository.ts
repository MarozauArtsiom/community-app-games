import { injectable, inject } from 'inversify';

import { LoggerService } from '../logger/logger.service';
import { AppTokenModel } from '../../../models/app-token';

@injectable()
export class AppTokenRepository {

    constructor(
        @inject(LoggerService) private loggerService: LoggerService,
    ) { }

    public async getAppToken(): Promise<string> {
        try {
            const token = await AppTokenModel.findAll();
            if (token.length !== 1) {
                throw new Error(`Application doesn't have unique token`);
            } else {
                return 'Bearer ' + token[0].dataValues.token;
            }
        } catch (error) {
            this.loggerService.errorLog(error);
        }
    }
}
