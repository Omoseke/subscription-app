import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Subscription Name is required"],
        trim: true,
        minLength:2,
        maxLength:50,
    },
    price:{
        type:Number,
        required:[true, "Subscription Price is required"],
        min:[0,"Price must be greater than 0"],
        
    },

    currency:{
        type:String,
        required:[true, "Subscription Currency is required"],
        enum:["USD", "EUR", "GBP"],
        default: "USD",

    },

    frequency:{
        type:String,
        enum:["daily", "weekly", "monthly", "yearly"],
        default: "monthly",
    },
    category:{
        type:String,
        enum:["business", "entertainment", "general", "health", "science", "sports", "technology"],
        required:[true, "Subscription Category is required"],
    },
    paymentMethod:{
        type:String,
        required: true,
        trim: true,
    },
    status:{
        type:String,
        enum:["active", "cancelled", "expired"],
        default: "active",

    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator: (value) => value <= new Date(),
            message: "Start Date must be in the past",
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator: function (value){
                return value > this.startDate;
            },
            message:"Renewal Date must be after the Start Date",
                
        }
    },
    //user is the reference to the User model
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    }


}, { timestamps: true });   
//
subscriptionSchema.pre("save", function(next){
    if(!this.renewalDate){
        const renewalsPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewableDate = new Date(this.startDate);
        this.renewableDate.setDate(this.renewableDate.getDate() + renewalPeriods[this.frequency]);
    }
    //Auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = "expired";
    }

    next();

})

const subscription = mongoose.model("Subscription", subscriptionSchema);