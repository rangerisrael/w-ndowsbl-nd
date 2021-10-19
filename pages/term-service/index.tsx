import { Grid } from '@mui/material';
import Layout from '../../components/Layout';

export default function TermService() {
  return (
    <Layout titles="term-service">
      <Grid container>
        <Grid item md={8} xs={12} style={{ margin: '2rem auto' }}>
          <p>This is my personal project in nextjs</p>
          <h2>Terms of Service</h2>
          <p>
            THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
            TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
            SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
            OTHER DEALINGS IN THE SOFTWARE.
          </p>
        </Grid>
      </Grid>
    </Layout>
  );
}
