import {
    Controller,
    Post,
    Get,
    HttpException,
    HttpStatus,
    Body,
    Query,
    Logger
  } from '@nestjs/common';
  import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);

  @Post('create')
  public async createUser(@Body() body: { user: any }) {
    try {
      const { user } = body;
      const result = await this.usersService.saveUser(user);
     // return result;
    } catch (error) {
      throw new Error(`Failed to create User nodes: ${error.message}`);
      // throw new HttpException(
      //   {
      //     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      //     message: 'Failed to create user',
      //     error: error.message,
      //   },
      //   HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }

  @Post('validateemail')
  public async validateEmailId(@Body() body: { emailId: any }) {
    try {
      const { emailId } = body;
      const result = await this.usersService.validateEmailId(emailId);
    } catch (error) {
      this.logger.error('Controller Error :', error.message);
      throw new Error(`${error.message}`);
    }
  }

  /*@Post('validateSignInData')
  public async validateSignInData(@Body() body: { signInData: any }) {
    try {
      const result = await this.usersService.validateEmailId(emailId);
    } catch (error) {
      this.logger.error('Controller Error :', error.message);
      throw new Error(`${error.message}`);
    }
  }*/

  @Post('validateSignInData')
  public async validateSignInData(@Body() body: { signInData: any }) {
    this.logger.error('validateSignInData API Hit :');
    try {
      const { signInData } = body;
      const result = await this.usersService.validateSignInData(signInData);
    } catch (error) {
      this.logger.error('validateSignInData API Error :', error.message);
      throw new Error(`Failed to validate username & password: ${error.message}`);
    }
  }
}