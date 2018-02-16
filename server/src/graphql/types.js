import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './types'), { extensions: ['.gql'] });

export default mergeTypes(typesArray);