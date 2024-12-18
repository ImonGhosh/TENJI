import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import axios from 'axios';
import { normalizeCaseNumber } from 'src/utils/helpers';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly neo4jService: Neo4jService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  public async saveUser(user) {
    this.logger.log('Creating new User nodes');

    // Check if user already exists with the given emailId
    const checkUserQuery = `
      MATCH (u:User { emailId: $emailId })
      RETURN u
    `;

    const userQuery = `
      CREATE (u:User {
        firstName: $firstName,
        lastName: $lastName,
        emailId: $emailId,
        password: $password,
        bio: $bio,
        occupation: $occupation
      })
    `;

    try {
      // Create User node
      const userResult = await this.neo4jService.runQuery(userQuery, {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        password: user.password,
        bio: user.bio,
        occupation: user.occupation,
      });

      this.logger.log(`Created User: ${JSON.stringify(userResult)}`);
    } catch (error) {
      this.logger.error('Failed to create User nodes', error.stack);
      throw new Error(`Failed to create User nodes: ${error.message}`);
    }
  }

  
  public async validateEmailId(emailId:string) {
    this.logger.error(`Test validateEmailId API`);
        // Check if user already exists with the given emailId
        const checkUserQuery = 
        `MATCH (u:User { emailId: $emailId })
        RETURN u`;
  
      try{
          // Check for existing user
          const existingUser = await this.neo4jService.runQuery(checkUserQuery, {
            emailId,
          });
      
          // Handle results based on actual data structure
          if (existingUser && existingUser.length > 0) {
            this.logger.error(`An account already exists with email id: ${emailId}`);
            throw new Error('An account already exists with this email id');
          }
      }catch(error){
        throw new Error(`${error.message}`);
      }

    }


    public async validateSignInData(signInData) {
        this.logger.error(`Test validateSignInData API`);
        const { username, password } = signInData;

        // Query to find a User node that matches the emailId and password
        const validateUserQuery = `
          MATCH (u:User { emailId: $username, password: $password })
          RETURN u`;

        try {
          this.logger.log(`Validating sign-in for emailId: ${username}`);

          // Run the query
          const result = await this.neo4jService.runQuery(validateUserQuery, {
            username,
            password,
          });

          // Handle query results
          if (result && result.length > 0) {
            this.logger.log(`User validated successfully for emailId: ${username}`);
          } else {
            this.logger.error(`Invalid username or password for emailId: ${username}`);
            throw new Error('Invalid username or password');
          }
        } catch (error) {
          this.logger.error(`Error validating sign-in: ${error.message}`);
          throw new Error(error.message);
        }
      }

}
