export const mediaUrl = (e: any) => {
        const input_id = (<HTMLInputElement>document.getElementById(`${e.target.id}`))
                .files[0];

        if (!input_id) return;

        const ConvertFile = URL.createObjectURL(input_id);
        if (ConvertFile) {
                return ConvertFile;
        }

};
