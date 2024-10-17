interface LogInProps {
    emailLogIn: string,
    passwordLogIn: string,
    setEmailLogIn: React.Dispatch<React.SetStateAction<string>>,
    setPasswordLogIn: React.Dispatch<React.SetStateAction<string>>,
    showPassword: (event: React.MouseEvent<HTMLButtonElement>) => void,
    show: boolean
}

interface SignUpProps {
    emailSignUp: string,
    passwordSignUp: string,
    setEmailSignUp: React.Dispatch<React.SetStateAction<string>>,
    setPasswordSignUp: React.Dispatch<React.SetStateAction<string>>,
    showPassword: (event: React.MouseEvent<HTMLButtonElement>) => void,
    show: boolean
}

interface ChangePasswordProps {
    showPassword: (event: React.MouseEvent<HTMLButtonElement>) => void,
    show: boolean
}

export type { ChangePasswordProps, LogInProps, SignUpProps }