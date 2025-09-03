import MainLayout from "../layout/MainLayout";
import { authenticate } from "../api/authApi";
import { useState } from "react";

export default function Admin() {

    const [isAdmin, setIsAdmin] = useState(false);

    onload = async () => {
        const token = localStorage.getItem("token");
        const user = await authenticate(token!);
        if(!user || user.role !== "admin") {
            setIsAdmin(false);
        }
        setIsAdmin(true);
    }

    return isAdmin ? (
        <MainLayout>
            <div>Admin dashboard</div>
        </MainLayout>
    ) : (
        <div>Access denied</div>
    );
}