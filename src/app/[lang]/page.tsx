import { LoginProvider } from "./login/_providers";
import LoginPage from "./login/page";

const Home = () => (
    <LoginProvider>
        <LoginPage />
    </LoginProvider>
);

export default Home;
