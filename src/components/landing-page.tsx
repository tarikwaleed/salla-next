import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import Link from "next/link"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"


export function LandingPage() {
  return (
    <>
      <section className="relative w-full h-screen bg-black">
        <img
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full  opacity-50"
          height={1080}
          src="/sheeps.jpg"
          style={{
            aspectRatio: "1920/1080",
            objectFit: "cover",
          }}
          width={1920}
        />
        <div className="relative h-full flex flex-col justify-center items-center gap-8 px-4 text-center">
          <h1 className="text-5xl font-bold text-white">اهلا بك في متجرنا</h1>
          <p className="text-xl text-white max-w-xl mx-auto">
            تعامل معنا وحقق مزيدا من الارباح
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">

            <SignedOut >
              <div className="flex flex-row justify-center gap-4">
                <SignUpButton mode="modal" afterSignUpUrl="/">
                  <Button className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-gray-700 transition-colors duration-200">
                    اشــــــــتراك
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal" afterSignInUrl="/">
                  <Button className="bg-gray-900 text-white rounded-md px-6 py-2 hover:bg-gray-700 transition-colors duration-200">
                    تسجيل الدخول
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-gray-700 transition-colors duration-200">
                  لوحة التحكم
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
      <footer className="">
        <div className="bg-gray-900 text-white py-8 px-4 md:px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-right">اتصل بنا</h3>
              <p className="text-sm text-right">
                اسم الشارع 1234
                <br />
                المدينة، الولاية، 90210
                <br />
                <a className="underline" href="#">
                  +1 (234) 567-890
                </a>
                <br />
                <a className="underline" href="#">
                  info@example.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-right">تابعنا</h3>
              <div className="flex space-x-4 justify-end">
                <Link href="#">
                  <FacebookIcon className="h-6 w-6" />
                  <span className="sr-only">فيسبوك</span>
                </Link>
                <Link href="#">
                  <TwitterIcon className="h-6 w-6" />
                  <span className="sr-only">تويتر</span>
                </Link>
                <Link href="#">
                  <InstagramIcon className="h-6 w-6" />
                  <span className="sr-only">إنستغرام</span>
                </Link>
                <Link href="#">
                  <LinkedinIcon className="h-6 w-6" />
                  <span className="sr-only">لينكدإن</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-right">معلومات عنا</h3>
              <p className="text-sm text-right">
                نحن فريق من المحترفين المتفانين الذين يشغفون بعملهم. نحن ملتزمون بتقديم منتجات وخدمات عالية الجودة لعملائنا.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm border-t border-gray-800 pt-4">
            © 2024 شركة أكمي. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </>



  )
}
function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}