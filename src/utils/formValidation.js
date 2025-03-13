import { isEmail, trim, normalizeEmail, isEmpty, isLength } from 'validator';

const validateSignUpFields = (inputFieldName, value) => {
    if (isEmpty(value, { ignore_whitespace: true })) {
        return 'Field is required';
    }

    switch (inputFieldName) {
        case 'username': {
            const username = trim(value);

            let isValid = isLength(username, { min: 3 });
            if (!isValid) return 'Must contain at least 3 characters';

            isValid = isLength(username, { max: 20 });
            if (!isValid) return 'Cannot exceed 20 characters';

            const whitespaceRegex = /\s/;
            isValid = !whitespaceRegex.test(username);
            if (!isValid) return 'Cannot contain whitespace';

            const usernameRegex = /^[A-Za-z0-9_]+$/;
            isValid = usernameRegex.test(username);
            if (!isValid) return 'Can only contain (a-z), (A-Z), (0-9), and _';

            return null;
        }
        case 'email': {
            let email = trim(value);

            email = normalizeEmail(email, { all_lowercase: true });

            let isValid = isEmail(email);
            if (!isValid) return 'Invalid email format';

            return null;
        }
        case 'password': {
            let isValid = isLength(value, { min: 8 });

            if (!isValid) return 'Must contain at least 8 characters';

            isValid = isLength(value, { max: 64 });
            if (!isValid) return 'Must not exceed 64 characters';

            const passwordRegex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_+=-]).+$/;
            isValid = passwordRegex1.test(value);
            if (!isValid)
                return 'Must contain at least one lowercase letter, one uppercase letter, one number, and one special character';

            const passwordRegex2 = /^[A-Za-z0-9!@#$%^&*_+=-\s]+$/;
            isValid = passwordRegex2.test(value);
            if (!isValid)
                return 'Can only contain (a-z), (A-Z), (0-9) and some common punctuations';

            return null;
        }
        default: {
            return null;
        }
    };
};

const validateLoginFields = (value) => {
    if (isEmpty(value, { ignore_whitespace: true })) {
        return 'Field is required';
    }
}
export { validateSignUpFields, validateLoginFields };
