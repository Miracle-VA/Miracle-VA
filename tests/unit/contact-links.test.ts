import { describe, expect, it } from "vitest";
import { emailUrl } from "@/lib/email";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * The site's only two conversion paths (no form, 2026-11-13). A wrong number
 * or address here loses every enquiry silently, so pin them.
 */
describe("whatsappUrl", () => {
  it("opens a chat with her number and a pre-filled message", () => {
    const url = new URL(whatsappUrl());
    expect(url.origin + url.pathname).toBe("https://api.whatsapp.com/send");
    expect(url.searchParams.get("phone")).toBe("639916758363");
    expect(url.searchParams.get("text")).toMatch(/^Hi Miracle, /);
  });

  it("names the page the visitor came from", () => {
    const text = new URL(whatsappUrl("paid advertising work")).searchParams.get("text");
    expect(text).toContain("your paid advertising work");
  });
});

describe("emailUrl", () => {
  it("opens Gmail compose addressed to her, with a subject and opening line", () => {
    const url = new URL(emailUrl());
    expect(url.origin + url.pathname).toBe("https://mail.google.com/mail/");
    expect(url.searchParams.get("view")).toBe("cm");
    expect(url.searchParams.get("to")).toBe("mangsalmiracle@gmail.com");
    expect(url.searchParams.get("su")).toBe("Enquiry from your website");
    expect(url.searchParams.get("body")).toMatch(/^Hi Miracle,\n\n/);
  });

  it("never uses the misspelt address from her PDF", () => {
    expect(emailUrl()).not.toContain("mangsalmiraclel");
  });

  it("names the page the visitor came from", () => {
    const body = new URL(emailUrl("social media work")).searchParams.get("body");
    expect(body).toContain("your social media work");
  });
});
