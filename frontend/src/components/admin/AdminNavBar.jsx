import logo from "../../assets/logo2.png"
import userLogo from "../../assets/admin.png"

export function AdminNavbar() {


    return (
        <div className={`fixed top-0 left-0 right-0 z-[500] bg-bgPrimary backdrop-blur-[20px] border-b border-b-border h-16`}>
            <div className="flex items-center justify-between h-full px-2 md:px-[80px]">
                <div className="flex items-center gap-2 md:gap-4 h-full">
                    <div className="h-[85px] w-auto">
                        <img src={logo} alt="CltX Logo" className="h-full w-auto" />
                    </div>
                </div>

                <div className="flex items-center gap-4 h-full">
                    <div className="flex items-center border-primary border-[3px] w-10 h-10 rounded-full justify-center cursor-pointer overflow-hidden">
                        <img
                            src={userLogo}
                            alt="Profile"
                            className="w-full h-full rounded-full transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
