import { Id } from "../../convex/_generated/dataModel";

export interface Product {
    _id: Id<"products">;
    // _id:string
    _creationTime: number;
    userId?: string | undefined;
    age: number
    type: string
    weight: number
    storageIds: string[]
}