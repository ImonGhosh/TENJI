export interface User {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  occupation?: string; // Optional as it might not always be provided
  bio?: string; // Optional as it might not always be provided
}

export interface SignInData {
  username: string;
  password: string;
}


  // export interface Preference {
  //   id: string;
  //   name: string;
  //   citing_cases: {
  //     low: number;
  //     high: number;
  //   };
  //   number: string;
  //   text: string;
  //   total_case_citations: {
  //     low: number;
  //     high: number;
  //   };
  // }