import { gql } from "apollo-boost";

export const PROJECT_VALIDATION = gql`
  query ProjectValidation($id: Int!, $project_type: String!) {
    projectValidation(id: $id, project_type: $project_type)
  }
`;