'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuthStore } from "@/app/store"
import { updateUser } from "@/app/service/user-service"
import { useRouter } from "next/navigation"

const Role = () => {
  const userRoles = [
    {
      role: 'ADMIN',
      title: 'An admin can create, edit and manage Gen AI trips, view all users, etc.'
    },
    {
      role: 'USER',
      title: 'A user can view AI generated trips, and make payments, etc.'
    },
  ]

  const {user, setUser, setRole, role} = useAuthStore()
  const router = useRouter()

  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
  }

 const [loading, setLoading] = useState(false)

  useEffect(() => {
        
       const urlParams = new URLSearchParams(window.location.search);
       const token = urlParams.get("token");
   
        if (!token) {
       console.error("❌ No token in URL");
      router.push("/sign-in");
      return;
      }
   
       const fetchUser = async () => {
         try {
           const res = await fetch("http://localhost:4000/choose-role/auth/me", {
             headers: { Authorization: `Bearer ${token}` },
           });

   
           if (!res.ok) throw new Error("Failed to fetch user");
   
           const user = await res.json();
           setUser(user, token);
         } catch (error) {
           console.error("Error:", error);
           router.push("/sign-in");
         }
       };
   
       fetchUser();
     }, [router, setUser]);

const handleUpdateUserRole = async () => {
  if (!selectedRole) return alert("Please select a role before updating.")
  setLoading(true)
  try {
    const response = await updateUser({ role: selectedRole }, user.userId)
    setRole(selectedRole)
    if (response) router.push('/')
  } catch (error) {
    console.error("Error updating user role:", error)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="w-full h-screen flex bg-auth bg-cover bg-no-repeat">
      <section className="size-full glassmorphism flex-center px-6">
        <div className="flex bg-white flex-col border border-light-100 md:max-w-[510px] rounded-[15px] py-6 px-6 w-full">
          <article className="mt-5 mb-[20px] flex flex-col gap-3">
            <h2 className="p-28-semibold text-dark-100 text-center">Choose a role</h2>
            <p className="p-18-regular text-center text-gray-100 !leading-7">
              Please select how you would like to view this project
            </p>
          </article>

          {/* Roles */}
          <div className="flex flex-col gap-3 py-4">
            {userRoles.map((role, index) => (
              <label
                key={index}
                className={`cursor-pointer bg-white px-4 py-3 rounded-lg flex items-center justify-between border gap-4 transition-all ${
                  selectedRole === role.role ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <p className={`font-semibold ${role.role === 'ADMIN' ? 'text-green-400' : 'text-primary-100'}`}>{role.role}</p>
                  <p className="text-gray-500 text-sm">{role.title}</p>
                </div>
                <input
                  type="radio"
                  name="role"
                  value={role.role}
                  checked={selectedRole === role.role}
                  onChange={() => handleRoleSelect(role.role)}
                  className="cursor-pointer size-5 accent-blue-500"
                />
              </label>
            ))}
          </div>

           
            <button
              disabled={!selectedRole || loading}
              className={`button-class !h-11 !w-full mt-3 cursor-pointer ${
                selectedRole ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={handleUpdateUserRole}
              
            >
              <div className="text-[15px] leading-[14px] font-semibold text-whie flex">
                {!selectedRole ?
                 <p>Select a role to continue</p>
                  :  
                    <div className="flex items-center gap-2">
                      <p className="text-white">{!loading && 'Choose role:'} <span className={`text-sm `}>{selectedRole}</span></p>
                     {loading && <Loader2 className="size-5 animate-spin text-white"/> }
                    </div>}
              </div>
            </button>
        </div>
      </section>
    </div>
  )
}

export default Role
