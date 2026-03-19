import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {WelcomePage} from "../WelcomePage.tsx";

describe("WelcomePage", () => {
    it('should display the welcome heading', () => {
        render(<WelcomePage/>)
        expect(screen.getByRole('heading', {name:/welcome/i})).toBeVisible();
    });
})