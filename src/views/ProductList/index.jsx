import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core/styles';

// Material components
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';

// Shared layouts
import DashboardLayout from 'layouts/Dashboard';

// Shared services
import { getProducts } from 'services/product';

// Custom components
import ProductsToolbar from './components/ProductsToolbar';
import ProductCard from './components/ProductCard';

// Component styles
import styles from './styles';

const ProductList = ({ classes }) => {
  const signalRef = useRef(true);

  const [state, setState] = useState({
    isLoading: false,
    limit: 6,
    products: [],
    productsTotal: 0,
    error: null,
  });

  const makeFetch = useCallback(async limit => {
    try {
      setState(state => ({
        ...state,
        isLoading: true,
      }));

      const { products, productsTotal } = await getProducts(limit);

      if (signalRef.current) {
        setState(state => ({
          ...state,
          isLoading: false,
          products,
          productsTotal,
          limit,
        }));
      }
    } catch (error) {
      if (signalRef.current) {
        setState(state => ({
          ...state,
          isLoading: false,
          error,
        }));
      }
    }
  }, []);

  const { limit } = state;

  useEffect(() => {
    signalRef.current = true;

    makeFetch(limit);

    return () => {
      signalRef.current = false;
    };
  }, [limit, makeFetch]);

  const renderProducts = () => {
    const { isLoading, products } = state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Typography variant="h6">There are no products available</Typography>
      );
    }

    return (
      <Grid container spacing={24}>
        {products.map(product => (
          <Grid item key={product.id} lg={4} md={6} xs={12}>
            <Link to="#">
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <DashboardLayout title="Products">
      <div className={classes.root}>
        <ProductsToolbar />
        <div className={classes.content}>{renderProducts()}</div>
        <div className={classes.pagination}>
          <Typography variant="caption">1-6 of 20</Typography>
          <IconButton>
            <ChevronLeftOutlinedIcon />
          </IconButton>
          <IconButton>
            <ChevronRightOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </DashboardLayout>
  );
};

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);
