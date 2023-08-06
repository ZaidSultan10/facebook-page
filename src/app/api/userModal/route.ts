import { NextResponse } from "next/server";
import {db} from '../db'

const User = db.User
console.log('user db ---',User)

export const GET = async () => {
    try{
        const user = await User.find()
        console.log('user ---',user)
        return NextResponse.json({ text: 'users list recieved', users:user },{status:200});
    }catch(err){
        return NextResponse.json({ text: 'Something went wrong', error: err },{status:400});
    }
}

export const POST = async (req: Request, res: Response) => {
    try{
        console.log('req000---',req)
        if(req.body && Object.keys(req.body).length > 0){
            console.log('req bpdy --->',req.body)
            const newUser = new User(req.body)
            await newUser.save()
            return NextResponse.json({ text: 'janu i am success' },{status:200});
        }else {
            return NextResponse.json({ text: 'No details provided' },{status:400});
        }
    }catch(err){
        console.log('err -->',err)
        return NextResponse.json({ text: 'Something went wrong', error: err },{status:400});
    }
}