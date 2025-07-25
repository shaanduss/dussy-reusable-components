import {
  Card,
  CardContent,
} from "@/components/ui/card";

const CircularProgressProps =
`export const CircularProgress = ({
  value = 0,
  size = 48,
  strokeWidth = 4,
  showText = true,
  className = "",
  color="text-cyan-600"
})`

export const CircularProgressDocs: React.FC = () => {
  return (
    <Card className="p-6">
      <CardContent className="space-y-8">
        {/* How to use the Form Generator Section */}
        <div>
          <h3 className="text-md md:text-xl font-semibold mb-2">What is the Circular Progress Component?</h3>
          <p className="mb-4">
            It's simply an <code>{"<svg>"}</code>. component that creates a ring with a filled color.
            The progress starts from the top of the circle and moves clockwise. It is a very simple component where
            we don't have to worry about how it's made too much. However, there are some props that are worth unpacking.
          </p>

          <h4 className="text-md md:text-lg font-semibold mb-2">Circular Progress Props</h4>
          {/* <p className="mb-4">
            So a <code>FormBox</code> consists of sections and its own name, as seen here in the props. Essentially the form design is top-down:
          </p> */}
          <pre className="bg-muted text-foreground rounded-md p-4 overflow-x-auto font-mono text-sm mb-4">
            {CircularProgressProps}
          </pre>

          <p className="mb-4">
            Below is a table explaining all of these props:
          </p>

          <table className="w-full border border-border rounded-lg border-separate overflow-hidden" style={{ borderSpacing: 0 }}>
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="py-3 px-5 text-left font-medium">Prop</th>
                <th className="py-3 text-left font-medium">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  prop: "value",
                  explanation: (
                    <>
                      <p>
                      This is the most important prop for functionality. This value is used to render the progress
                      fill of the circle. It can be passed using a <code>useState</code> variable. If you've done
                      so, you would need to render the ProgressCard using <code>useMemo</code> with a dependency array
                      of: <code>[{"<state_variable>"}]</code>
                      </p>
                    </>
                  )
                },
                {
                  prop: "size",
                  explanation: "Very simple prop allowing you to change the size of the progress circle",
                },
                {
                  prop: "strokeWidth",
                  explanation: "Simply the width of the ring, pretty simple..."
                },
                {
                  prop: "showText",
                  explanation:
                    `In the case that you want a number with a percentage sign in the middle of the progress circle,
                    i.e. 78%, you can specify whether to show the value or not. In our example, we don't use this
                    feature - I personally think it looks better but feel free to use it.
                    `,
                },
                {
                  prop: "className",
                  explanation:
                    "No explanation needed.",
                },
                {
                  prop: "color",
                  explanation:(
                    <>
                      <p> This sets the color of the progress fill for the component. The way you specify this is important,
                        it has to follow the following format:
                      </p>
                      <div className="py-4">
                        <p>
                          <code>text-{`color: "text-<tailwind_css_color>"`}</code>
                        </p>
                        <p className="mt-2 font-bold">
                          or
                        </p>
                        <p className="mt-2">
                          <code>text-{`color: "text-[#<hex_color>]"`}</code>
                        </p>
                      </div>
                      <p>
                        if you want to use custom colors.
                      </p>
                    </>
                  )
                },
              ].map(({ prop, explanation }) => (
                <tr key={prop} className="even:bg-muted/50">
                  <td className="border-t border-border py-3 px-5 font-mono align-top">{prop}</td>
                  <td className="border-t border-border py-3 px-5">{explanation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};