import { fetchPublishedCommentary } from "./app/analysis/public-commentary/data";
async function main() {
    const records = await fetchPublishedCommentary();
    console.log(JSON.stringify(records, null, 2));
}
main().catch(console.error);
