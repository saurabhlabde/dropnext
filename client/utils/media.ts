export const media = (e: any) => {
        const input_id = (<HTMLInputElement>document.getElementById(`${e.target.id}`))
                .files[0];

        if (!input_id) return;

        return input_id

};
