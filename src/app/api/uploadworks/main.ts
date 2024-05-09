import {createUploadWorks, FileRouter, UploadWorksError} from "uploadworks/server";

const f = createUploadWorks();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    wallpapers: f({maxFileSize: 10000000, directory: "/", mime: "image/*" }) // 10mb max
        .middleware(async ({ req }) => {
            const id = await auth(req)
            return { metadata: {identifier: id}};
        })
        .onUploadComplete(async ({ file }) => {
            const id = file.metadata.id // fakeId
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

