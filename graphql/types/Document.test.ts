import { parse } from "graphql";
import { describe, expect, test } from "vitest";

import { assertSingleValue, executor } from "../schema.test";

describe("documents", () => {
  async function getDocuments(
    variables: {
      search?: string;
    } = {},
  ) {
    const result = await executor({
      document: parse(`
        query documents ($search: String) {
          documents (search: $search) {
            id
            name
          }
        }
      `),
      variables,
    });
    assertSingleValue(result);
    return result.data.documents;
  }

  test("return all documents", async () => {
    const documents = await getDocuments();
    expect(documents.length).toEqual(68);
  });

  test("return all documents w/ search", async () => {
    const documents = await getDocuments({
      search: "Addendum",
    });
    expect(documents.length).toEqual(66);
  });
});
