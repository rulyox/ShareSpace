import mysqlManager from '../mysql-manager';
import postSQL from './post-sql';
import utility from '../utility';

const writePost = (user: number, text: string): Promise<boolean> => {
    return new Promise(async (resolve) => {

        try {

            const postAddQuery: any = await mysqlManager.executeDB(postSQL.addPost(user, text));
            resolve(true);

        } catch(error) {

            utility.print(error);
            resolve(false);

        }

    });
};

export default {
    writePost
};
