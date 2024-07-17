

import background from "../assets/images/background.jpg"
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <>

            <div className="relative z-10 min-h-screen lg:border-2 lg:shadow-xl lg:shadow-gray-400 lg:rounded-3xl bg-white flex items-center justify-center lg:w-[calc(100%-24rem)] lg:ml-96">
                <main className="flex  justify-center h-full w-full">
                    <div className="px-4 sm:px-6 lg:px-8 lg:pb-[10%] ">
                        <LoginForm />

                    </div>
                </main >
            </div >
            <aside className="fixed inset-y-0 left-4 hidden w-96 py-6 lg:block overflow-y-auto">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={background}
                    alt="Background"
                />
            </aside>
        </>
    );
}
