import type { Access, FieldAccess, PayloadRequest } from "payload";

// Admin panel access control
export const adminPanelAccess = ({ req }: { req: PayloadRequest }) => {
    if (req?.user?.role === 'admin') {
        return true;
    }
    return false;
}

// Collection-level access control

export const anyone: Access = () => true;

export const adminOnly: Access = ({ req: { user } }) => {
    if (user?.role === 'admin') {
        return true;
    }
    return false;
}

export const adminOrSelf: Access = ({ req: { user } }) => {
    if (!user) {
        return false;
    }
    if (user?.role == 'admin') {
        return true;
    }

    return {
        id: {
            equals: user.id,
        },
    };
}

export const adminOrUser: Access = ({ req: { user } }) => {
    return Boolean(user);
}

export const adminOrCreatorWrite: Access = ({ req }) => {
    console.log(req);
    if (!req.user) {
        return false;
    }
    if (req.user.role === 'admin') {
        return true;
    }
    return req.data?.createdBy === req.user.id;
}

export const adminOrCreator: Access = ({ req }) => {
    if (!req.user) {
        return false;
    }
    if (req.user.role === 'admin') {
        return true;
    }
    return {
        createdBy: {
            equals: req.user.id,
        }
    };
}

// Field-level access control
export const adminOnlyField: FieldAccess = ({ req: { user } }) => {
    if (user?.role === 'admin') {
        return true;
    }
    return false;
}


