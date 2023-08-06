import getConfig from 'next/config';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(`mongodb+srv://zaidsultan09:7Fu3gvZaoiAMYuXx@cluster0.pds0u4a.mongodb.net/?retryWrites=true&w=majority` || getConfig()?.serverRuntimeConfig?.connectionString).then(() => {
    // app.listen(PORT, () => {
        // mongodb+srv://zaidsultan09:sIYetYV75bZhZ3sM@cluster0.pds0u4a.mongodb.net/?retryWrites=true&w=majority
        console.log(`Server Running On Port `)
    // })
}).catch((err) =>{
    console.log('err --- ',err)
});
mongoose.Promise = global.Promise;
export const db = {
    User: userModel()
};

function userModel() {
    const schema = new Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email:{ type: String, required: true },
        password:{ type: String, required: true },
        dateOfBirth: { type: String, required: true },
        gender: { type: String, required: true }
    }, {
        timestamps: true
    });

    return mongoose.models.User || mongoose.model('User', schema);
}