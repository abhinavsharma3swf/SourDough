import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {WelcomePage} from "../WelcomePage.tsx";

describe("WelcomePage", () => {
    it('should display the welcome heading', () => {
        render(<WelcomePage/>)
        userEvent.click(screen.getByRole("heading"));
        expect(screen.getByRole('heading', {name:/welcome/i})).toBeVisible();
    });
})