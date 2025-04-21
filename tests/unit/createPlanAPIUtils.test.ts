// createPlanAPIUtils.test.ts
import createPlanAPIUtils from "app/shared/products/create-plans/createPlanAPIUtils";
import { describe, it } from "node:test";

  
  describe("createPlanAPIUtils", () => {
    describe("extractFormData", () => {
      it("throws MissingDataError if any required data is missing", async () => {
        // Mock request
        const mockRequest = {
          formData: async () => new FormData()
        } as unknown as Request;
  
        // We pass empty productId
        await expect(
          createPlanAPIUtils.extractFormData(mockRequest, { productId: "" })
        ).rejects.toThrow(MissingDataError);
      });
  
      it("returns expected data when present", async () => {
        // Setup form data
        const formData = new FormData();
        formData.append("plans", JSON.stringify({ key: "value" }));
        formData.append("appId", "someAppId");
  
        const mockRequest = {
          formData: async () => formData
        } as unknown as Request;
  
        const result = await createPlanAPIUtils.extractFormData(mockRequest, { productId: "123" });
        expect(result).toEqual({
          plansString: JSON.stringify({ key: "value" }),
          appGraphqlId: "someAppId",
          productId: "123"
        });
      });
    });
  
    describe("parsePlansJson", () => {
      it("returns parsed object on valid JSON", () => {
        const obj = { a: 1 };
        const jsonStr = JSON.stringify(obj);
        const result = createPlanAPIUtils.parsePlansJson(jsonStr);
        expect(result).toEqual(obj);
      });
  
      it("throws error on invalid JSON", () => {
        expect(() => createPlanAPIUtils.parsePlansJson("{invalidJson")).toThrow("Invalid JSON format in plans");
      });
    });
  
    describe("authenticateAction", () => {
      it("returns false if no authData is found", async () => {
        const mockRequest = {
          headers: { get: () => null }
        } as unknown as Request;
  
        const result = await createPlanAPIUtils.authenticateAction(mockRequest, async () => ({}));
        expect(result).toBe(false);
      });
  
      it("returns admin when authentication is successful", async () => {
        // Mock cookieAuth
        const mockRequest = {
          headers: {
            get: () => "mockCookie"
          }
        } as unknown as Request;
  
        // Mock the authenticate.admin function
        const mockAuthAdmin = jest.fn().mockResolvedValue({ admin: { graphql: jest.fn() } });
  
        // We have to also mock getAuthCookie and mergeQueryParams
        // but let's do it inline or rely on real behavior in your code
        // for demonstration. Typically you'd mock "getAuthCookie" as well.
  
        const result = await createPlanAPIUtils.authenticateAction(mockRequest, mockAuthAdmin);
        // Because we didn't actually set up getAuthCookie or mergeQueryParams,
        // you'd need to do so if you want to test them thoroughly.
        // This is just a conceptual example.
  
        // We only check that the result is truthy if admin is returned
        if (!result) throw new Error("Expected result to be truthy");
        expect(result.admin).toBeDefined();
      });
    });
  
    describe("authenticateRequest", () => {
      it("returns null if authenticateAction returns false", async () => {
        const mockRequest = {} as unknown as Request;
        jest
          .spyOn(createPlanAPIUtils, "authenticateAction")
          .mockResolvedValue(false);
  
        const admin = await createPlanAPIUtils.authenticateRequest(mockRequest);
        expect(admin).toBeNull();
      });
  
      it("returns admin if authenticateAction resolves with admin", async () => {
        const mockRequest = {} as unknown as Request;
        jest
          .spyOn(createPlanAPIUtils, "authenticateAction")
          .mockResolvedValue({ admin: {} as AuthAdmin });
  
        const admin = await createPlanAPIUtils.authenticateRequest(mockRequest);
        expect(admin).not.toBeNull();
      });
    });
  });
  