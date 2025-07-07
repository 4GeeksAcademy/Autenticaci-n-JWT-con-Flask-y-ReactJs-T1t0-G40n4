export const Login = () => {
    return (
        <section className="container d-flex justify-content-center">
            <form className="w-25">
                <h1 className="text-center mb-4">Login</h1>
                <fieldset className="d-flex flex-column mb-3">
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" required />
                </fieldset>
                <fieldset className="d-flex flex-column mb-3">
                    <label>Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" required />
                </fieldset>
            </form>
        </section>
    )
}