export default [
    {
        email: "andershallemiversen@hotmail.com",
        group: [
            {
                id: "097a789f-29a1-4417-9378-04b7efce18a6",
                municipalitiy: "4dd2c0aa-9b39-40a8-9950-c0ae87c788b4",
                name: "Trondheim kommune",
                user_group: {userId: "7f417652-3bda-411e-b5b1-f515e06fb8bd", groupId: "097a789f-29a1-4417-9378-04b7efce18a6"},
            },
        ],
        id: "7f417652-3bda-411e-b5b1-f515e06fb8bd",
        isAdmin: false,
        phone: null,
    }
];

export const userStateMock = (userMock) => ({
    id: userMock.id,
    email: userMock.email,
    isAdmin: userMock.isAdmin,
    group: userMock.group,
    phone: null,
    roles: {
        groups: [
            {
                name: userMock.group[0].name,
                id: userMock.group[0].id,
                municipalityId: userMock.group[0].municipalitiy
            }
        ]
    },
    selectedGroup: {
        name: userMock.group[0].name,
        id: userMock.group[0].id,
        municipalityId: userMock.group[0].municipalitiy
    }
});